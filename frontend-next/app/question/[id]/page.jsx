"use client";

import auth from "@/auth/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiClock } from "react-icons/fi";
import { BiMessageAltCheck } from "react-icons/bi";
import Testareaanswer from "@/components/ui/textareaeditor";

const QuestionPage = ({ params }) => {
  const _id = params.id;
  const [question_, setQuestion_] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/${_id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setQuestion_(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [_id]);

  if (loading)
    return (
      <div className="text-center p-10 text-[#B6B09F]">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        Error: {error.message}
      </div>
    );
  if (!question_)
    return (
      <div className="text-center p-10 text-gray-500">No data found</div>
    );

  const { title, question, answers, tag, date, name } = question_.problems;
  const currentTime = new Date();
  const problemTime = new Date(date);
  const diff = Math.abs(currentTime - problemTime);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let timeAgo = `${days} days ago`;
  if (days === 0 && hours === 0 && minutes < 2) timeAgo = "Just now";
  else if (days === 0 && hours === 0)
    timeAgo = `${minutes} minutes ago`;
  else if (days === 0) timeAgo = `${hours} hours ago`;

  const no_of_answers = answers?.length || 0;

  const updatedAnswers = answers.map((answer, index) => {
    const answerTime = new Date(answer.date);
    const diff = Math.abs(currentTime - answerTime);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let timeAgo_ = `${d} days ago`;
    if (d === 0 && h === 0 && m < 2) timeAgo_ = "Just now";
    else if (d === 0 && h === 0) timeAgo_ = `${m} minutes ago`;
    else if (d === 0) timeAgo_ = `${h} hours ago`;

    return (
      <div
        key={index}
        className="bg-[#EAE4D5] shadow-md rounded-lg p-4 mb-4"
      >
        <div className="flex justify-between text-sm text-[#6a6a6a] capitalize">
          <span className="font-semibold text-[#B6B09F]">
            {answer.name}
          </span>
          <span>{timeAgo_}</span>
        </div>
        <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
          {answer.answer}
        </p>
      </div>
    );
  });

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#B6B09F] mb-2">
          Question
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Explore answers from the community and share your insights.
        </p>

        <div className="bg-[#EAE4D5] rounded-xl shadow-md p-6">
          <div className="text-sm text-[#6a6a6a] mb-1 capitalize">
            {name}
          </div>
          <h2 className="text-2xl font-bold mb-3">{title}</h2>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
            <div className="flex items-center mr-4">
              <FiClock className="mr-1" /> asked {timeAgo}
            </div>
            <div className="flex items-center">
              <BiMessageAltCheck className="mr-1" /> {no_of_answers} answers
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tag.map((tag, index) => (
              <span
                key={index}
                className="bg-[#B6B09F] text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-800 whitespace-pre-wrap mb-6 text-sm">
            {question}
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-[#B6B09F]">
              Answers
            </h3>
            {no_of_answers === 0 ? (
              <div className="text-sm font-medium text-[#B6B09F]">
                No answers yet!
              </div>
            ) : (
              updatedAnswers
            )}

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 text-[#B6B09F]">
                Write your answer
              </h4>
              <Testareaanswer _id={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth(QuestionPage);

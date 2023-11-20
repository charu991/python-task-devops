import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrow90DegRight, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddReferral = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-3">
      <div className="mx-1 mt-2 border-0 fw-bold" onClick={() => navigate(-1)}>
        <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
      </div>
      <div
        className="card p-2 mt-3"
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        <h5 className="p-2 pb-4 text-decoration-underline">ADD REFERRAL</h5>

        <form
          className="d-flex flex-column gap-4 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="d-flex gap-3">
            <input
              className="border border-muted px-3 py-2 rounded-3 w-25"
              placeholder="Start Date"
              type="date"
              {...register("startDate")}
              style={{
                outline: "none",
              }}
            />

            <input
              className="border border-muted px-3 py-2 rounded-3 w-25"
              placeholder="End Date"
              type="date"
              {...register("endDate")}
              style={{
                outline: "none",
              }}
            />
          </div>

          <div className="d-flex gap-3">
            <input
              className="border border-muted px-3 py-2 rounded-3 w-25"
              placeholder="Referral amount"
              {...register("amount")}
              type="text"
              style={{
                outline: "none",
              }}
            />

            <select
              className=" border border-muted px-3 py-2 rounded-3 w-25"
              style={{ backgroundColor: "#f1f9fc" }}
              id="amountType"
              {...register("amountType")}
            >
              <option value="">Amount Type</option>
              <option value="BTC">BTC</option>
              <option value="Ether">Ether</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div>
            <button className=" border-0 p-2 rounded-3 bg-primary text-white">
              Submit <BsArrow90DegRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReferral;

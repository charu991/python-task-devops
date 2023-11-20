import axios from "axios";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsArrow90DegRight, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddRole = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, handleSubmit } = form;

  const [checkBox, setCheckBox] = useState(false);

  const roleSubmit = (data) => {
    console.log(data);

    // fetch("http://localhost:3001/role", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // axios
    //   .post("http://localhost:3001/role", data, {})
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <h5 className="p-2 pb-4 text-decoration-underline">ADD ROLE</h5>
        <form
          className="d-flex flex-column gap-4 p-2"
          onSubmit={handleSubmit(roleSubmit)}
        >
          <div className="d-flex gap-3 flex-wrap">
            <div className="d-flex flex-column gap-3">
              <label htmlFor="role">Role Name :</label>
              <input
                id="role"
                className="border border-muted px-3 py-1 rounded-3 "
                placeholder="Add Role"
                {...register("roleName")}
                type="text"
                style={{
                  outline: "none",
                }}
              />
            </div>

            <div className="d-flex flex-column gap-3">
              <label htmlFor="description">Description :</label>
              <input
                id="description"
                className="border border-muted px-3 py-1 rounded-3 "
                placeholder="Description"
                {...register("description")}
                type="text"
                style={{
                  outline: "none",
                }}
              />
            </div>
          </div>

          <p
            className="border-0 bg-white my-3"
            style={{ cursor: "pointer" }}
            onClick={() => setCheckBox(!checkBox)}
          >
            Select Role Module
          </p>

          <div>
            {checkBox ? (
              <div className="d-flex flex-column gap-4 px-4">
                <div>
                  <h6>Admin_Management</h6>
                  <div className="d-flex gap-5 flex-wrap ">
                    <span className="d-flex gap-2">
                      <label htmlFor="admin_read">Read</label>
                      <input
                        id="admin_read"
                        type="checkbox"
                        {...register("admin_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="admin_write">Write</label>
                      <input
                        id="admin_write"
                        type="checkbox"
                        {...register("admin_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="admin_edit">Edit</label>
                      <input
                        id="admin_edit"
                        type="checkbox"
                        {...register("admin_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="admin_delete">Delete</label>
                      <input
                        id="admin_delete"
                        type="checkbox"
                        {...register("admin_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">User_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="user_read">Read</label>
                      <input
                        id="user_read"
                        type="checkbox"
                        {...register("user_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="user_write">Write</label>
                      <input
                        id="user_write"
                        type="checkbox"
                        {...register("user_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="user_edit">Edit</label>
                      <input
                        id="user_edit"
                        type="checkbox"
                        {...register("user_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="user_delete">Delete</label>
                      <input
                        id="user_delete"
                        type="checkbox"
                        {...register("user_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Withdrawal_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="withdrawal_read">Read</label>
                      <input
                        id="withdrawal_read"
                        type="checkbox"
                        {...register("withdrawal_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="withdrawal_write">Write</label>
                      <input
                        id="withdrawal_write"
                        type="checkbox"
                        {...register("withdrawal_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="withdrawal_edit">Edit</label>
                      <input
                        id="withdrawal_edit"
                        type="checkbox"
                        {...register("withdrawal_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="withdrawal_delete">Delete</label>
                      <input
                        id="withdrawal_delete"
                        type="checkbox"
                        {...register("withdrawal_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Transaction_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="transaction_read">Read</label>
                      <input
                        id="transaction_read"
                        type="checkbox"
                        {...register("transaction_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="transaction_write">Write</label>
                      <input
                        id="transaction_write"
                        type="checkbox"
                        {...register("transaction_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="transaction_edit">Edit</label>
                      <input
                        id="transaction_edit"
                        type="checkbox"
                        {...register("transaction_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="transaction_delete">Delete</label>
                      <input
                        id="transaction_delete"
                        type="checkbox"
                        {...register("transaction_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Wallet_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="wallet_read">Read</label>
                      <input
                        id="wallet_read"
                        type="checkbox"
                        {...register("wallet_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="wallet_write">Write</label>
                      <input
                        id="wallet_write"
                        type="checkbox"
                        {...register("wallet_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="wallet_edit">Edit</label>
                      <input
                        id="wallet_edit"
                        type="checkbox"
                        {...register("wallet_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="wallet_delete">Delete</label>
                      <input
                        id="wallet_delete"
                        type="checkbox"
                        {...register("wallet_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Fee_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="fee_read">Read</label>
                      <input
                        id="fee_read"
                        type="checkbox"
                        {...register("fee_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="fee_write">Write</label>
                      <input
                        id="fee_write"
                        type="checkbox"
                        {...register("fee_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="fee_edit">Edit</label>
                      <input
                        id="fee_edit"
                        type="checkbox"
                        {...register("fee_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="fee_delete">Delete</label>
                      <input
                        id="fee_delete"
                        type="checkbox"
                        {...register("fee_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Dispute_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="dispute_read">Read</label>
                      <input
                        id="dispute_read"
                        type="checkbox"
                        {...register("dispute_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="dispute_write">Write</label>
                      <input
                        id="dispute_write"
                        type="checkbox"
                        {...register("dispute_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="dispute_edit">Edit</label>
                      <input
                        id="dispute_edit"
                        type="checkbox"
                        {...register("dispute_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="dispute_delete">Delete</label>
                      <input
                        id="dispute_delete"
                        type="checkbox"
                        {...register("dispute_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Role_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="role_read">Read</label>
                      <input
                        id="role_read"
                        type="checkbox"
                        {...register("role_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="role_write">Write</label>
                      <input
                        id="role_write"
                        type="checkbox"
                        {...register("role_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="role_edit">Edit</label>
                      <input
                        id="role_edit"
                        type="checkbox"
                        {...register("role_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="role_delete">Delete</label>
                      <input
                        id="role_delete"
                        type="checkbox"
                        {...register("role_delete")}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <h6 className="">Referral_Management</h6>
                  <div className="d-flex gap-5 flex-wrap">
                    <span className="d-flex gap-2">
                      <label htmlFor="referral_read">Read</label>
                      <input
                        id="referral_read"
                        type="checkbox"
                        {...register("referral_read")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="referral_write">Write</label>
                      <input
                        id="referral_write"
                        type="checkbox"
                        {...register("referral_write")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="referral_edit">Edit</label>
                      <input
                        id="referral_edit"
                        type="checkbox"
                        {...register("referral_edit")}
                      />
                    </span>

                    <span className="d-flex gap-2">
                      <label htmlFor="referral_delete">Delete</label>
                      <input
                        id="referral_delete"
                        type="checkbox"
                        {...register("referral_delete")}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button className=" border-0 px-2 py-1 rounded-3 bg-primary text-white">
              Submit <BsArrow90DegRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;

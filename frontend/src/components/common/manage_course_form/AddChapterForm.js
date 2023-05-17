import axios from 'axios';
import { Form, Formik, useField } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={props.id || props.name} className="mb-[8px] text-base font-semibold text-[var(--primary-color)]">
          {label}
        </label>
        <input
          {...props}
          {...field}
          className="pl-[15px] py-[8px]"
        />
  
        {meta.touched && meta.error ? (
          <div className="text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };
const AddChapterForm = ({id_course,closeModal}) => {

    const handleAddChapter = async(data)=>{
        const response = await axios.post(`http://localhost:5000/api/courses/${id_course}/chapter`,data)
        return response.data
    }
    return (
        <Formik
            initialValues={{
                name: ""
            }}

            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
            })}

            onSubmit = {(values)=>{
                // console.log(values);
                const data = {
                  name: values.name
                };
                handleAddChapter(data).then((result)=>{
                  if(result.status === 'success'){
                    toast.success('Add Chapter Successfully')
                    window.location.reload()
                  }else{
                    toast.error('Something went wrong')
                  }
                })
            }}
        >

            <Form className="pt-[50px]">
                <h2 className="text-center text-[var(--primary-color)] text-[28px] border-b-2 border-b-[var(--primary-color)] pb-[20px] ">THÊM CHƯƠNG</h2>
                <div className="pb-[70px] mx-10 h-[200px] overflow-y-auto">
                    {/* Tên chương */}
                    <MyInput label="Tên chương" type="text" name="name" id="name" placeholder="Nhập tên chương..." />
                    <button className="float-right  ml-[20px] bg-[var(--primary-color)] text-white text-base px-[20px] py-[5px] rounded-lg" type="submit">THÊM</button>
                    <button className="float-right border bg-red-600 text-white text-base px-[20px] py-[5px] rounded-lg " onClick={closeModal}>HỦY</button>
                </div>
            </Form>
        </Formik>
    );
};

export default AddChapterForm;
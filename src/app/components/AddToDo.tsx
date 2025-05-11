/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddToDo = ({ onClose }: any) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [todo, setTodo] = useState<string>('');
    const [errors, setErrors] = useState<string>('');

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            if (!todo || todo.trim() === '') {
                setErrors('Please enter a todo');
                return;
            }
            const { data } = await axios.post("/api/todos", {
                title: todo,
            })
            console.log(data?.todo);
        } catch (error) {
            error instanceof axios.AxiosError ? setErrors(error.response?.data) : setErrors('Something went wrong');
        }


    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl p-10 w-full max-w-md relative"
            >
                <div><FontAwesomeIcon icon={faXmark} onClick={() => onClose()} className='cursor-pointer absolute right-3 top-1 p-3' /></div>
                <h2 className="text-xl font-bold mb-4 text-center">Add a New Todo</h2>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder='Enter todo' value={todo} className='w-full p-2 border border-gray-300 rounded mb-4' onChange={(e) => {
                        setTodo(e.target.value);
                        setErrors('');
                    }} />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add Todo
                    </button>
                </form>
                {errors && <p className='text-red-500 mt-2'>{errors}</p>}
            </div>
        </div>
    );
};

export default AddToDo;

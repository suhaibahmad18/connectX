import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';

export default function Messages() {
    const { messages, loading } = useGetMessage();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, [messages]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                messages.length > 0 &&
                messages.map((message, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                        <div key={message._id} ref={isLast ? lastMessageRef : null}>
                            <Message message={message} />
                        </div>
                    );
                })
            )}

            <div className='' style={{ minHeight: "calc(88vh - 10vh)" }}>
                {!loading && messages.length === 0 && (
                    <div>
                        <p className='text-center font-sans mt-[20%]'>Say! Hi</p>
                    </div>
                )}
            </div>
        </>
    );
}


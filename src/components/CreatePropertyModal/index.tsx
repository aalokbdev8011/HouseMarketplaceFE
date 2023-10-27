import React from 'react';
import PropertyForm from '../PropertyForm';

interface CreatePropertyFormProps {
    isOpen: boolean;
    onCancel: () => void;
}

const CreatePropertyModal: React.FC<CreatePropertyFormProps> = ({ isOpen, onCancel }) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            {isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full my-6 mx-auto max-w-xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl text-cyan-800 font-semibold">
                                        Create Property
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={onCancel}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto h-full">
                                    <PropertyForm
                                        setShowModal={setShowModal}
                                        editMode={false}
                                        postId={1} 
                                        onCancel={onCancel}/>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default CreatePropertyModal;
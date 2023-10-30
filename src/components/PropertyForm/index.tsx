import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ButtonLoader from "../ButtonLoader";
import { useNavigate } from "react-router-dom";
import { createPropertyAPI, updatePropertyAPI, fetchPropertyDetails } from "../../Servicie/ApiService";

interface FormValues {
    title: string;
    price: string;
    city: string;
    district: string;
    rooms: string;
    mrt_station: string;
    property_type: string;
    images: File | null; // Initialize the image field as null
}

interface ApiResponse {
    data: any;
    success: boolean;
    message: string;
    blog?: {
        id: number;
        title: string;
        price: string;
        city: string;
        district: string;
        rooms: number;
        mrt_station: string;
        property_type: string;
        images: {
            data: ArrayBuffer;
        };
    };
}

const initialValues: FormValues = {
    title: "",
    price: "",
    city: "",
    district: "",
    rooms: "",
    mrt_station: "",
    property_type: "",
    images: null,
};

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
    city: Yup.string().required("City is required"),
    district: Yup.string().required("District is required"),
    rooms: Yup.string().required("Rooms is required"),
    mrt_station: Yup.string().required("MRT Station is required"),
    property_type: Yup.string().required("Property Type is required"),
    images: Yup.mixed().required("Image is required"),
});

const PropertyForm: React.FC<{onCancel: () => void; editMode: boolean; postId: string }> = ({
    editMode,
    postId,
    onCancel
}) => {
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const navigate = useNavigate();
    const [initialValuesForEdit, setInitialValuesForEdit] = useState<FormValues>(initialValues);

    useEffect(() => {
        if (editMode) {
            fetchPostData(postId);
        }
    }, [editMode, postId]);

    const fetchPostData = async (postId: string) => {
        try {
            const idNumber = parseInt(postId, 10);
            const data: ApiResponse = await fetchPropertyDetails(idNumber);
            const response = data.data.attributes

            if (response) {
                const { title, price, city, district, rooms, mrt_station, property_type, images } = response;
                setInitialValuesForEdit({
                    title,
                    price,
                    city,
                    district: district[0][0] || '',
                    rooms,
                    mrt_station,
                    property_type,
                    images
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("API error:", error);
        }
    };


    const handleSubmit = async (values: FormValues, { setFieldValue }: { setFieldValue: (field: string, value: any) => void }) => {
        setSubmitBtnDisable(true);
        const formData = new FormData();

        formData.append('property[title]', values.title);
        formData.append('property[price]', values.price);
        formData.append('property[city]', values.city);
        formData.append(`property[district]`, values.district);
        formData.append('property[rooms]', `${values.rooms}`);
        formData.append('property[mrt_station]', values.mrt_station);
        formData.append('property[property_type]', values.property_type);
        formData.append('property[image]', values.images || '');

        try {
            if (editMode) {

                const response: ApiResponse = await updatePropertyAPI(+postId, formData);
                if (response.success) {
                    toast.success(response.message);
                    navigate("/");
                    onCancel()
                } else {
                    toast.error(response.message);
                }
            } else {

                const response: ApiResponse = await createPropertyAPI(formData);
                if (response) {
                    toast.success('Property added successfully');
                    onCancel();
                    navigate("/");
                }
            }
            setSubmitBtnDisable(false);
        } catch (error) {
            console.error("API error:", error);
        }
    };
    return (
        <div className="addpostpage d-flex align-items-center justify-content-center  overflow-auto">
            <Formik
                initialValues={initialValuesForEdit}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {(formik) => (
                    <Form className="flex flex-wrap addpostForm px-3">
                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="title">
                                Title
                            </label>
                            <Field className="inputField text-black p-3 bg-white border border-gray" type="text" id="title" name="title" />
                            <ErrorMessage name="title" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="price">
                                Price
                            </label>
                            <Field className="inputField p-3 text-black bg-white border border-gray"
                                type="text"
                                id="price"
                                name="price"
                                onKeyPress={(e: { key: string; preventDefault: () => void; }) => {
                                    if (e.key !== '0' && e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== 'Backspace') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <ErrorMessage name="price" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="city">
                                City
                            </label>
                            <Field
                                className="inputField p-3 text-black bg-white border border-gray"
                                type="text"
                                id="city"
                                name="city"
                            />
                            <ErrorMessage name="city" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="district">
                                District
                            </label>
                            <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="district" name="district" />
                            <ErrorMessage name="district" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="rooms">
                                Rooms
                            </label>
                            <Field
                                className="inputField p-3 text-black bg-white border border-gray"
                                type="text"
                                id="rooms" name="rooms"
                                onKeyPress={(e: { key: string; preventDefault: () => void; }) => {
                                    if (e.key !== '0' && e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4' && e.key !== '5' && e.key !== '6' && e.key !== '7' && e.key !== '8' && e.key !== '9' && e.key !== 'Backspace') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <ErrorMessage name="rooms" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="mrt_station">
                                MRT Station
                            </label>
                            <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="mrt_station" name="mrt_station" />
                            <ErrorMessage name="mrt_station" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="property_type">
                                Property Type
                            </label>
                            <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="property_type" name="property_type" />
                            <ErrorMessage name="property_type" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex flex-col w-1/2 mb-3 px-2">
                            <label className="text-black mb-2" htmlFor="images">
                                Upload Images
                            </label>
                            <input
                                className="text-sm text-stone-500 w-full file:mr-5 file:hidden text-center px-5 py-[14px] border border-gray rounded-sm
                            hover:file:cursor-pointer hover:file:bg-blue-50
                            hover:file:text-blue-700"
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*" // Restrict file type to images
                                onChange={(event) => {
                                    event.preventDefault();
                                    const file = event.target.files?.[0];
                                    formik.setFieldValue("images", file);
                                }}
                            />
                            <ErrorMessage name="images" component="div" className="error text-red-400" />
                        </div>

                        <div className="flex justify-end w-full mt-5">
                            <button
                                className="text-gray-700 bg-[#d1d1d1] mr-3 font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onCancel}
                            >
                                Close
                            </button>

                            <button
                                type="submit"
                                className=" bg-gradient-to-r from-blue-300 to-cyan-700 text-white p-2 rounded shadow-md hover:shadow-lg w-[100px] h-[45px] flex justify-center items-center"
                                disabled={submitBtnDisable}
                            >
                                {submitBtnDisable ? <ButtonLoader /> : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PropertyForm;

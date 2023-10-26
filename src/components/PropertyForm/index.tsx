import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ButtonLoader from "../ButtonLoader";
import { useNavigate } from "react-router-dom";
import { createPropertyAPI, updatePropertyAPI } from "../../Servicie/ApiService";

interface FormValues {
  title: string;
  price: string;
  city: string;
  district: string;
  rooms: number;
  mrt_station: string;
  property_type: string;
  images: File | null; // Initialize the image field as null
}

interface ApiResponse {
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
  rooms: 0,
  mrt_station: "",
  property_type: "",
  images: null,
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  rooms: Yup.number().required("Rooms is required"),
  mrt_station: Yup.string().required("MRT Station is required"),
  property_type: Yup.string().required("Property Type is required"),
  images: Yup.mixed().required("Image is required"),
});

const bufferToFile = (bufferImageData: ArrayBuffer): File => {
  const blob = new Blob([bufferImageData], { type: "image/jpeg" });
  return new File([blob], "image.jpg", { type: "image/jpeg" });
};

const PropertyForm: React.FC<{ setShowModal: (show: boolean) => void; editMode: boolean; postId: number }> = ({
  setShowModal,
  editMode,
  postId,
}) => {
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const navigate = useNavigate();
  const [initialValuesForEdit, setInitialValuesForEdit] = useState<FormValues>(initialValues);

  useEffect(() => {
    if (editMode) {
    //   async function fetchPostData() {
    //     try {
    //       const data: ApiResponse = await fetchBlogDataDetails(postId);
    //       if (data?.blog) {
    //         const imageData = bufferToFile(data?.blog.images.data);
    //         const { title, price, city, district, rooms, mrt_station, property_type } = data?.blog;
    //         setInitialValuesForEdit({
    //           title,
    //           price,
    //           city,
    //           district,
    //           rooms,
    //           mrt_station,
    //           property_type,
    //           images: null,
    //         });
    //       } else {
    //         toast.error(data.message);
    //       }
    //     } catch (error) {
    //       console.error("API error:", error);
    //     }
    //   }
    //   fetchPostData();
    }
  }, [editMode, postId]);

  const handleSubmit = async (values: FormValues, { setFieldValue }: { setFieldValue: (field: string, value: any) => void }) => {
    setSubmitBtnDisable(true);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("city", values.city);
    formData.append("district", values.district);
    // formData.append("rooms", values.rooms);
    formData.append("mrt_station", values.mrt_station);
    formData.append("property_type", values.property_type);
    formData.append("images", values.images || "");

    try {
      if (editMode) {
        const response: ApiResponse = await updatePropertyAPI(postId, formData);
        if (response.success) {
          toast.success(response.message);
          navigate("/");
          setShowModal(false);
        } else {
          toast.error(response.message);
        }
      } else {
        const response: ApiResponse = await createPropertyAPI(formData);
        if (response.success) {
          toast.success(response.message);
          navigate("/");
          setShowModal(false);
        } else if (response.success === false) {
          toast.error(response.message);
        }
      }
      setSubmitBtnDisable(false);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValuesForEdit,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="addpostpage d-flex align-items-center justify-content-center max-h-[65vh] overflow-auto">
      <Formik
        initialValues={initialValuesForEdit}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className="d-flex flex-column addpostForm px-3">
            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="title">
                Title
              </label>
              <Field className="inputField text-black p-3 bg-white border border-gray" type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="price">
                Price
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="price" name="price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="city">
                City
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="district">
                District
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="district" name="district" />
              <ErrorMessage name="district" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="rooms">
                Rooms
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="number" id="rooms" name="rooms" />
              <ErrorMessage name="rooms" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="mrt_station">
                MRT Station
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="mrt_station" name="mrt_station" />
              <ErrorMessage name="mrt_station" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-black mb-2" htmlFor="property_type">
                Property Type
              </label>
              <Field className="inputField p-3 text-black bg-white border border-gray" type="text" id="property_type" name="property_type" />
              <ErrorMessage name="property_type" component="div" className="error" />
            </div>

            <div className="flex flex-col mb-3">
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
              <ErrorMessage name="images" component="div" className="error" />
            </div>

            <div className="flex justify-end">
              <button
                className="text-gray-700 bg-[#d1d1d1] mr-3 font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-md text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

import PropTypes from "prop-types";
import { useState } from "react";

/**
 * @param {Object} props
 * @param {Object[]} props.products
 */
export default function ProductsUI({ products = [] }) {
  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState();
  console.log(message);

  async function deletePost(id) {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Post was successfully deleted", data);
  }

  async function handleOnSubmitEdit(event, id, userId) {
    event.preventDefault();

    const textAreaElement = event.target.elements.postEditBody.value;
    setMessage(textAreaElement);
    const payload = {
      id: id,
      title: `foo`,
      body: textAreaElement,
      userId: userId,
    };

    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();
    setIsEditing(false);
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map(
        ({
          id,
          thumbnail,
          description,
          title,
          price,
          authorName,
          body,
          userId,
        }) => (
          <div key={id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={thumbnail}
                alt={description}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={`/products/${id}`}>{title}</a>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">{price}</p>
            </div>

            <p className="mt-1 text-sm text-gray-500">Person {authorName}</p>

            {isEditing ? (
              <form onSubmit={(event) => handleOnSubmitEdit(event, id, userId)}>
                <label
                  htmlFor="postEditBody"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Edit your post
                </label>

                <textarea
                  id="postEditBody"
                  name="postEditBody"
                  rows="4"
                  cols="34"
                  className=""
                  defaultValue={message}
                />

                <button
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800"
                >
                  Update
                </button>
              </form>
            ) : (
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            )}
            <button
              onClick={() => {
                deletePost(id);
              }}
              className="px-2 py-1 mb-2 mr-2 text-xs font-medium text-center"
            >
              Delete
            </button>

            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="px-2 py-1 mb-2 mr-2 text-xs font-medium text-center text-white bg-orange-700 rounded-full hover:bg-orange-800"
            >
              Edit
            </button>
          </div>
        ),
      )}
    </div>
  );
}

ProductsUI.propTypes = {
  products: PropTypes.array,
};

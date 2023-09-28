import Products from "../components/products";
import Posts from "../components/Posts";
import CreatePostForm from "../components/create-post";

function HomePage() {
  return (
    <>
      <CreatePostForm />
      <Products />
      <Posts />
    </>
  );
}

export default HomePage;

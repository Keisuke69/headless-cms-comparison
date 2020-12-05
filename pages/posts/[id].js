import Link from "next/link";
import Layout from "../../components/layout";
import Head from "next/head";
import axios from "axios";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await fetchPostsFromWordPress(params.id);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {

  const paths = await fetchPathsFromWordPress();
  return {
    paths,
    fallback: false,
  };
}

async function fetchPostsFromWordPress(id) {
  const url =
    "https://public-api.wordpress.com/rest/v1.1/sites/keisuke69.wordpress.com/posts/" +
    id;
  const response = await axios.get(url);
  const post = await response.data;
  return post;
}

async function fetchPathsFromWordPress() {
  const url =
    "https://public-api.wordpress.com/rest/v1.1/sites/keisuke69.wordpress.com/posts/";
  const response = await axios.get(url);
  const postsData = await response.data.posts;

  const paths = postsData.map((posts, index) => {
    return {
      params: {
        id: `${posts.ID}`,
      },
    };
  });
  return paths;
}
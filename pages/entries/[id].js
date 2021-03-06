import Link from "next/link";
import Layout from "../../components/layout";
import Head from "next/head";
import axios from "axios";
import {useRouter} from "next/router"


export default function Entry({ post }) {
  const router = useRouter()
  if(router.isFallback){
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <h2>
        <Link href="/entries/">
          <a>Back</a>
        </Link>
      </h2>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await fetchPostsFromWordPress(params.id)

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  // const url =
  //   "https://public-api.wordpress.com/rest/v1.1/sites/keisuke69.wordpress.com/posts/";
  // const response = await axios.get(url);
  // const postsData = await response.data.posts;

  // const paths = postsData.map((posts, index) => {
  //   return {
  //     params: {
  //       id: `${posts.ID}`,
  //     },
  //   };
  // });
  const paths = await fetchPathsFromWordPress()
  return {
    paths,
    fallback: true,
  };
}

async function fetchPostsFromWordPress(id) {
  const url =
    "https://public-api.wordpress.com/rest/v1.1/sites/keisuke69.wordpress.com/posts/" +
    id;
  const response = await axios.get(url).catch((response) => {
    return {
      data: {
        content: `${response.message}`,
      },
    };
  })
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
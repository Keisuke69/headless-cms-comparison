import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import axios from "axios"
import Link from "next/link"
import Router, {useRouter} from "next/router"

export default function Index(){
 return <div />
}

async function getIndexFromWordpress() {
  const url = "https://public-api.wordpress.com/rest/v1.1/sites/keisuke69.wordpress.com/posts/"
  const response = await axios.get(url)
  const postsData = await response.data.posts
  return postsData
}
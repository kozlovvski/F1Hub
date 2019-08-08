import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Layout from '../components/Layout';

const Home = () => {
  const [date, setDate] = useState(null);

  return (
    <Layout>
      <Head title="Home" />
      <p>hello world</p>
    </Layout>
  )
}

export default Home

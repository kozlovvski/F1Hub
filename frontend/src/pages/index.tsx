import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from 'antd'
import AppLayout from '../layouts/AppLayout'
import indexStyles from '../scss/index.module.scss'

const IndexPage = () => (
  <AppLayout>
    <div className={indexStyles.index}>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Button type="primary">elo</Button>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </AppLayout>
)

export default IndexPage

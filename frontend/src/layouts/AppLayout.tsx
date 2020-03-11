import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const AppLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query AppLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => <div>{children}</div>}
  />
)

export default AppLayout

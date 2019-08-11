import * as React from 'react'
import { Button } from 'antd'

class Index extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }
  login() {
    this.props.history.push('/login')
    console.log(1)
  }
  register() {
    this.props.history.push('/register')
    console.log(2)
  }
  render() {
    return (
      <div>
        index
        <Button onClick={() => this.login()}>login</Button>
        <Button onClick={() => this.register()}>register</Button>
      </div>
    )
  }
}

export default Index

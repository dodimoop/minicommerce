import React, { Component } from 'react'
import { Container, Grid, Image, Segment, Header, Icon, Button } from 'semantic-ui-react'
import { BASE_MEDIA } from '../../Services/env'
import classes from './detailsCard.module.scss';

class detailsCard extends Component {
  state = {
    currentProduct: null,
  }

  async componentDidMount () {
    await this.setState({
      currentProduct: JSON.parse(window.localStorage.getItem('currentProduct'))
    })
  }

  onBackToCatalog = async () => {
    this.props.history.push('/')
  } 

  render() {

    let details = <></>
    if (this.state.currentProduct) {
      details = (
        <Grid>
          <Grid.Column width={6}>
            <Image className={classes.detailsCard} src={BASE_MEDIA + this.state.currentProduct.img.name} />
          </Grid.Column>
          <Grid.Column className="gridColumn" width={10}>
            <Grid.Column className={classes.detailsCard} >
              <Header as="h1" dividing>
                {this.state.currentProduct.title}
              </Header>
              <Icon className={classes.iconPrice} name="dollar sign"/> <b>{this.state.currentProduct.pricing.price}</b>
              <Segment className={classes.detailsDescription}>
                <Header as="h3">
                  <b>Description</b>
                </Header>
                <Container>
                  <p>{this.state.currentProduct.desc}</p>
                </Container>
              </Segment>
            </Grid.Column>
            <Button
              content='Back to Catalogs'
              icon='left arrow'
              labelPosition='left'
              floated="right"
              onClick={this.onBackToCatalog}
              color="google plus" 
            />
          </Grid.Column>         
        </Grid>
      )
    }

    return (
      <>
        <Container>
          {details}
        </Container>
      </>
    )
  }
}

export default detailsCard

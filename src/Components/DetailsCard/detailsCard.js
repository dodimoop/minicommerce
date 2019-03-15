import React, { Component } from 'react'
import { Container, Grid, Image, Card } from 'semantic-ui-react'
import { BASE_MEDIA } from '../../Services/env'
import classes from './detailsCard.module.scss';

class detailsCard extends Component {
  state = {
    currentProduct: null,
  }

  async componentDidMount () {
    // console.log(window.localStorage.getItem('currentProduct'));
    await this.setState({
      currentProduct: JSON.parse(window.localStorage.getItem('currentProduct'))
    })
    // console.log(this.state.currentProduct);
  }

  render() {

    let details = <></>
    if (this.state.currentProduct) {
      details = (
        <Grid>
          <Grid.Column width={6}>
            <Image className={classes.detailsCard} src={BASE_MEDIA + this.state.currentProduct.img.name} />
          </Grid.Column>
          <Grid.Column width={10}>
          <Card
            header={this.state.currentProduct.title}
            meta={'USD ' + this.state.currentProduct.pricing.price}
            description={this.state.currentProduct.desc}
            className={classes.detailsContent}
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

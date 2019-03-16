import React, { Component } from 'react'
import { Card, Grid, Image, Button, Dimmer, Loader } from 'semantic-ui-react'
import classes from './cards.module.scss'
import API from '../../Services/services'
import { BASE_MEDIA } from '../../Services/env'

class CardComponent extends Component {

	state = {
		catalogs: [],
    isLoading: false,
    page: 0
	}

	async componentDidMount() {
    await this.fetchProducts()
  }

  fetchProducts = async () => {
		try {
      await this.setState({ catalogs: [], isLoading: true})
			const response = await API.get('/catalog/search', {
				params: {
					page: this.state.page,
					pageSize: 20
				}
			})
			
			if(response) {
				await this.setState({catalogs: response.data.products, isLoading: false})
			}
		} catch (error) {
			console.log(error);
		}
  }
  
  cardOnClick = (data) => {
    const idProduct = data.id
    window.localStorage.clear()
    window.localStorage.setItem('currentProduct', JSON.stringify(data))
    this.props.history.push(`/product/${idProduct}`)
  }

  buyHandling = () => {
    alert("Oooops sorry, can't buy at this moment :)");
  }

  onNextPage = async () => {
    await this.setState({page: this.state.page + 1})
    await this.fetchProducts()
  }

  onPrevPage = async () => {
    await this.setState({page: this.state.page - 1})
    await this.fetchProducts()
  }

	render () {
		let dataHandler
		if (this.state.catalogs) {
			dataHandler = (
				this.state.catalogs.map((data, key) => (
					<Grid.Column width={4} key={key} className={classes.gridColumn}>
						<Card centered onClick={() => this.cardOnClick(data)} key={data.id}>
              <Image 
                className={classes.heightImage}
                src={BASE_MEDIA + data.img.name} />
							<Card.Content className={classes.heightContent}>
								<Card.Header>{data.title}</Card.Header>
							</Card.Content>
							<Card.Content extra>
								<Button fluid animated='vertical' className={classes.colorButton}>
									<Button.Content hidden color="pink" onClick={() => this.buyHandling()}>Buy</Button.Content>
									<Button.Content visible>USD {data.pricing.price}</Button.Content>
								</Button>
							</Card.Content>
						</Card>
					</Grid.Column>
				))
			)
		} else {
			dataHandler = (
				<Dimmer active inverted>
					<Loader inverted content='Loading' />
				</Dimmer>
			)
		}

		return (
      <div className={classes.cardComponent}>
        <Grid className={classes.Grid}>
          <Grid.Row>
            {dataHandler}
          </Grid.Row>
        </Grid>
        <div className={classes.buttonNextPrev}>
          <Button
            content='Prev'
            icon='left arrow'
            labelPosition='left'
            floated="left"
            disabled={this.state.page <= 0}
            onClick={this.onPrevPage} />
          <Button
            content='Next'
            icon='right arrow'
            labelPosition='right'
            floated="right"
            onClick={this.onNextPage} />
        </div>
      </div>
		)
	}
}

export default CardComponent

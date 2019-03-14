import React, { Component } from 'react'
import { Card, Grid, Image, Button, Dimmer, Loader } from 'semantic-ui-react'
import classes from './cards.module.scss'
import API from '../../Services/services'

class CardComponent extends Component {
	state = {
		catalogs: [],
		isLoading: false
	}

	async componentDidMount() {
		try {
			const response = await API.get('/catalog/search', {
				params: {
					page: 0,
					pageSize: 20
				}
			})
			
			if(response) {
				this.setState({catalogs: response.data.products, isLoading: true})
			}
		} catch (error) {
			
		}
	}

	render () {
		let loadingHandler
		if (this.state.catalogs) {
			loadingHandler = (
				this.state.catalogs.map((data, key) => (
					<Grid.Column width={4} key={key} className={classes.gridColumn}>
						<Card centered href="#">
							<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
							<Card.Content>
								<Card.Header>{data.title}</Card.Header>
								<Card.Meta>
									<span className='date'>S/S T-shirt</span>
								</Card.Meta>
							</Card.Content>
							<Card.Content extra>
								<Button fluid animated='vertical' className={classes.colorButton}>
									<Button.Content hidden color="pink">Buy</Button.Content>
									<Button.Content visible>IDR. 1,885,000</Button.Content>
								</Button>
							</Card.Content>
						</Card>
					</Grid.Column>
				))
			)
		} else {
			loadingHandler = (
				<Dimmer active inverted>
					<Loader inverted content='Loading' />
				</Dimmer>
			)
		}

		return (
			<div className={classes.cardComponent}>
				<Grid className={classes.Grid}>
					<Grid.Row>
						{loadingHandler}
					</Grid.Row>
				</Grid>
				<div className={classes.buttonNextPrev}>
					<Button
						content='Prev'
						icon='left arrow'
						labelPosition='left'
						floated="left" />
					<Button
						content='Next'
						icon='right arrow'
						labelPosition='right'
						floated="right" />
				</div>
			</div>
		)
	}
}

export default CardComponent

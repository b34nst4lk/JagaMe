import React from 'react'
import { Card, Title, Subheading } from 'react-native-paper'

export function ProductCard(props) {
    return (
       <Card style={{flex: 1}}>
            <Card.Cover source={{uri: props.img}}/>
            <Card.Content>
                <Title>{props.name}</Title>
                <Subheading>{stringToDollars(props.price)}</Subheading>
                {props.children}
            </Card.Content>
        </Card>
    )
}

function stringToDollars(text) {
    return '$' + parseFloat(text).toFixed(2)
}
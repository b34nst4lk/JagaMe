import React from 'react'
import { Card, Subheading, Title } from 'react-native-paper'

export function ProductCard(props) {
    let item = props.item
    return (
       <Card style={{flex: 1}} onPress={props.onPress}>
            <Card.Cover source={{uri: item.images[0].src}}/>
            <Card.Content>
                <Title>{item.name}</Title>
                <Subheading>{stringToDollars(item.price)}</Subheading>
                {props.children}
            </Card.Content>
        </Card>
    )
}

function stringToDollars(text) {
    return '$' + parseFloat(text).toFixed(2)
}
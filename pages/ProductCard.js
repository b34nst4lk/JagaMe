import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper'

export function ProductCard(props) {
    return (
        <Card>
            <Card.Cover source={{uri: props.img}}/>
            <Card.Content>
                <Title>{props.name}</Title>
                <Paragraph>{props.price}</Paragraph>
            </Card.Content>
        </Card>
    )
}
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react'
import Form from '../molecules/Form'

const Detail = ({ route, navigation }) => {
    return (
        <Form type="update" id={route.params.id} />
    )
}

export default Detail

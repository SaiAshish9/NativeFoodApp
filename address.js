import React from 'react'

import { 
    View,
    Text
} from 'react-native'

export default class Address extends React.Component {
    constructor(props){
      super(props)
      this.state={
          data:""
      }
    }

render(){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>
                {this.state.data}
            </Text>
        </View>
    )
}


}
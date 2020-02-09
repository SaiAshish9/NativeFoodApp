import React from 'react'

import { 
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import Food from './Food'
import Cart from './cart'
import Profile from './profile'
import Address from './address'


import Icon from "react-native-vector-icons/Ionicons"

console.disableYellowBox=true

const {width}=Dimensions.get("window")

export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state={
          module:1
      }
    }

render(){
    return (
        <View style={{flex:1}}>
          {this.state.module==1?
                <Food/>
                :this.state.module==2?
                <Cart/>
                :this.state.module==3?
                <Address/>
                :<Profile/>
          }


<View style={style.bottomTab}>

<TouchableOpacity
onPress={()=>this.setState({module:1})}
>
<View style={style.itemTab}>
  <Icon name="md-restaurant" size={30} color={this.state.module==1?"#900":"gray"} />

</View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>this.setState({module:2})}
>
<View style={style.itemTab}>
<Icon name="md-basket" size={30} color={this.state.module==2?"#900":"gray"} />

</View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>this.setState({module:3})}
>
<View style={style.itemTab}>
<Icon name="md-map" size={30} color={this.state.module==3?"#900":"gray"} />

</View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>this.setState({module:4})}
>
<View style={style.itemTab}>
<Icon name="ios-contact" size={30} color={this.state.module==4?"#900":"gray"} />

</View>
</TouchableOpacity>
</View>


        </View>




    )
}


}

const style=StyleSheet.create({
  bottomTab:{
    width:width,
    backgroundColor:"gray",
    flexDirection:"row",
    height:30,
    shadowOpacity:0.3,
    shadowRadius:50
  },
  itemTab:{
    width:width/4,
    backgroundColor:"white",
    alignItems:'center',
    justifyContent:'center',
    height:30
  }
})
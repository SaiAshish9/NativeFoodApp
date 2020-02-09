import React from 'react'

import { 
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons"

import AsyncStorage from '@react-native-community/async-storage'

var {width}=Dimensions.get("window")

export default class Cart extends React.Component {
    constructor(props){
      super(props)
      this.state={
          data:[]
      }
    }


componentDidMount(){
    AsyncStorage.getItem("cart")
    .then(data=>{
        if(data){

const cartFood=JSON.parse(data)
this.setState({data:cartFood})

        }else{

        }
    })
}

render(){
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{height:20}} />

            <Text style={{fontSize:20,color:'gray',fontWeight:'bold'}}>
                Cart Food
            </Text>

            <View style={{height:10}} />
            



            <View style={{       
                  backgroundColor:'transparent',flex:1}}>


{
this.state.data.map((item,i)=>{
        return (
            <ScrollView >
<View style={{width:width-20,flex:1,justifyContent:'space-between',borderWidthBottom:2,borderColor:"#cccccc",padding:10}}>
<Image style={{width:width/3,height:width/3}} source={{uri:item.food.image}}/>

    <View>
    <Text style={{fontSize:18,fontWeight:'bold'}}>
{item.food.name}
    </Text>
    <Text>

    </Text>
</View>

    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  
    <Text style={{
        fontWeight:'bold',
        color:'#33c37d',
        fontSize:20
    }}>
${item.price*item.quantity}
    </Text>

<View style={{flexDirection:'row',alignItems:'center'}}>
    
    <TouchableOpacity 
    onPress={()=>this.changeQuantity(false,i)}
    >
    <Icon name="ios-remove-circle" size={30} color={"#33c37d"} />
    </TouchableOpacity>
    
    <Text style={{fontWeight:'bold',paddingHorizontal:8}}>
{item.quantity}
    </Text>
    
    <TouchableOpacity
        onPress={()=>this.changeQuantity(true,i)}
    >

    <Icon name="ios-add-circle" size={30} color={"#33c37d"} />
    </TouchableOpacity>

</View>

</View>

</View>


<View style={{height:20}}/>


<Text style={{fontSize:30,color:'#33c37d'}}>
    ${this.loadTotal()}
</Text>
<View style={{height:10}}/>
</View>
</ScrollView>


        )
    })
   
    })
}
        






<TouchableOpacity
style={{
    backgroundColor:'#33c37d',
    width:width-40,
    alignItems:'center',
    padding:10,
    borderRadius:5
}}
>
    <Text style={{
        fontSize:24,
        fontWeight:'bold',
        color:'white'
            }}>
        CHECKOUT 
    </Text>
</TouchableOpacity>

<View style={{height:10}}/>


        </View>
    )
}


loadTotal(){
    var total=0
    const {data}=this.state
    for(var i=0;i<this.state.data.length;i++){
total=total+(data[i].price*data[i].quantity)
}
return total
}

changeQuantity(type,i){
    const {data}=this.state
if(type){
data[i].quantity+=1
this.setState({data})
}else if(type==false&&data[i].quantity>=2){
    data[i].quantity-=1
    this.setState({data})
}else if(type==false&&data[i].quantity==1){
    data=data.splice(i,1)
    this.setState({data})
}
}


}
 
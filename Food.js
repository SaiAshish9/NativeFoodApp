import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons"

import AsyncStorage from '@react-native-community/async-storage'

import Swiper from 'react-native-swiper'


var {height,width} = Dimensions.get('window')



export default class Food extends React.Component{

constructor(props){
  super(props)
  this.state={
    dataBanner:[],
    isLoading:true,
    dataCategories:[],
    dataFood:[],
    selectCategory:''
  }
}

componentDidMount(){
  const url="http://tutofox.com/foodapp/api.json"
  return fetch(url)
  .then(res=>res.json())
  .then(data=>{
    this.setState({
      isLoading:false,
      dataBanner:data.banner,
      dataCategories:data.categories,
      dataFood:data.food
    })
  })
}

  render(){
    return (
      <ScrollView>

      <View style={styles.container}>

<View style={{width:width,alignItems:"center"}}> 
<Image resizeMode="contain" style={{width:width/2,height:60,margin:10}} source={{uri:'http://tutofox.com/foodapp/foodapp.png'}}/>

<Swiper style={{height:width/2}} autoplay={true} showsButtons={false} autoplayTimeout={2} >
{
  this.state.dataBanner.map((item)=>{
    return(
      <Image style={styles.imageBanner} resizeMode="contain" source={{uri:item}}/>
    )
  })
}
</Swiper>
</View>


<View style={{width:width,borderRadius:20,paddingVertical:20,backgroundColor:'white'}}>



<View style={{height:10}}>

</View>

 <FlatList 
 horizontal={true}
 data={this.state.dataCategories}
 renderItem={({item})=>this._renderItem(item)}
 keyExtractor={(item,index)=>index.toString()}
 > 
 </FlatList>
 </View>


 <FlatList
data={this.state.dataFood}
numColumns={2}
renderItem={({item})=>this._renderItemFood(item)}
keyExtractor={(item,index)=>index.toString()}
>
  </FlatList>

      </View>

      </ScrollView>
    )
  }



_renderItemFood(item){
  let catg=this.state.selectCategory
  if(catg==0||catg==item.categorie){
    return (
      <TouchableOpacity style={styles.divFood}>
   
<View style={{height:((width/2)-20)-90,width:((width/2)-20)-10,backgroundColor:'transparent',alignItems:'center'}}>
<Image style={styles.imageFood}
        resizeMode="contain"
        source={{uri:item.image}}

        />
</View>
        <Text style={{fontWeight:'bold'}}>
  {item.name}
</Text>
<Text style={{fontWeight:'bold'}}>
  ${item.price}
</Text>


<TouchableOpacity
style={{
  width:(width/2)-40,
  backgroundColor:'#33c37d',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
  padding:5,
  flexDirection:'row'
}}


onPress={()=>this.addToCart(item)}
>
  <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>
    Add To Cart
  </Text>

<View style={{width:10}}>

</View>


<Icon name='ios-add-circle' size={30} color={"white"}/>

</TouchableOpacity>

      </TouchableOpacity>
    )
  }
 

  }
  addToCart(data){
    const itemcart={
      food:data, 
      quantity:1,
      price:data.price
    }
AsyncStorage.getItem("cart")
.then((data)=>{
  if(data){
    const cart=JSON.parse(data)
    cart.push(data)
    AsyncStorage.setItem("cart",JSON.stringify(cart))

  }
  else{
    const cart=[]
    cart.push(itemcart)
    AsyncStorage.setItem("cart",JSON.stringify(cart))
  }
  alert("added")
})
}

  _renderItem(item){
    return(
      <TouchableOpacity 
      onPress={()=>this.setState({selectCategory:item.id})}
      
      style={[styles.divCategories,{backgroundColor:item.color}]}>
  <Image style={{width:100,height:80}}
   resizeMode="contain"
   source={{uri:item.image}}/>

<Text style={{fontWeight:'bold'}}>
  {item.name}
</Text>

      </TouchableOpacity>
    )
  }
  


}
 


const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f2f2f2'
  },
  imageBanner:{
    height:width/2,
    width:width,
    borderRadius:10,
  },
  titleCatg:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
  divCategories:{
    backgroundColor:'red',
    margin:5,
    alignItems:'center',
    borderRadius:10,
    padding:10
  },
  imageFood:{
    width:((width/2)-20)-70,
    height:((width/2)-20)-90,
    backgroundColor:'transparent',
  
  },
  divFood:{
    width:(width/2)-20,
    backgroundColor:'red',
    padding:20,
    borderRadius:10,
    marginLeft:10,
    marginBottom:5,
    marginTop:5,
    alignItems:"center",
    elevation:8, 
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white'
  }
})

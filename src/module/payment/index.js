import React, { useState } from 'react'
import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk';
import { dispatch, useGlobalState } from '../../store/state'
import Hashids from 'hashids'
import Colors from '../../styles/color'

const WEB = 'WEB';
const BASE_RESPONSE_TEXT = '';
const apiKey = '89036df25f2bc35774180aed063098';
const apiSecret = '1d5b907737240018ee577db51e0c6d0a586343d2';
const env = 'TEST';
const hashids = new Hashids()




const makePayment = (amount, note,user, responseHandler) => {

  async function _createOrderWithToken(orderId, amount) {
    let tokenUrl;
    if (env === 'TEST') {
      tokenUrl = 'https://test.cashfree.com/api/v2/cftoken/order'; //for TEST
    } else {
      tokenUrl = 'https://api.cashfree.com/api/v2/cftoken/order'; //for PROD
    }

    let orderApiMap = {
      orderId: orderId,
      orderAmount: amount,
      orderCurrency: 'INR',
    };

    const postParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': apiKey,
        'x-client-secret': apiSecret,
      },
      body: JSON.stringify(orderApiMap),
    };
    return new Promise((resolve, reject) => {
      let cfToken;
      fetch(tokenUrl, postParams)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("data" + data);
          if (data.status === 'ERROR') {
            console.log(
              `Error (code: ${data.subCode}, message: ${data.message})`,
            );
            console.log(
              'Please check the apiKey and apiSecret credentials and the environment',
            );
            return;
          }
          try {
            cfToken = data.cftoken;
            console.log('Token is : ' + data.cftoken);
            // console.log('data is : ' + JSON.stringify(data));
            let map = {
              orderId: orderId,
              orderAmount: amount,
              tokenData: cfToken,
              orderCurrency: 'INR',
            };
            return resolve(map);
          } catch (error) {
            console.log('THE ERROR IS ' + data);
            return reject(data);
          }
        });
    });
  }
  async function dopayment() {
    const orderId = hashids.encode(user.id) + "ORDER-" + Date.now()
    console.log(orderId)
    const map = await _createOrderWithToken(orderId, amount);
    console.log(map)
    let checkout = {
      'orderId': orderId,
      'orderAmount': map.orderAmount,
      'appId': apiKey,
      'tokenData': map.tokenData,
      'orderCurrency': "INR",
      'orderNote': note,
      'customerName': user.name,
      'customerPhone': user.phone,
      'customerEmail': user.email,
      'hideOrderId': 'true',
      'color1': Colors.primary,
      'color2': Colors.white,
      'appName': 'appId',
      'notifyUrl':'https://khojodoctor.in/customer.acceptorder'
    }
    RNPgReactNativeSdk.startPaymentWEB(checkout, env, responseHandler);
  }
  dopayment()
}

export default makePayment;
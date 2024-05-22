import React from 'react'
import SideBar from '../components/SideBar'
import styles from "./profile.module.css";
import {
  Card,
  CardBody,
  CardHeader,
  Text, 
  Avatar
} from "@chakra-ui/react";

const Profile = () => {
  return (
    <div className={styles.main}>
      <div><SideBar /></div>
      <div className={styles.body}>
        <div className={styles.title}>
          My Profile
        </div>
        <div className={styles.avatar}>
          <Avatar size="superLg"/>
        </div>
        <div className={styles.cards}>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader>
              <Text color="black">
                Email
              </Text>
            </CardHeader>
          </Card>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader>
              <Text color="black">
                Profile
              </Text>
            </CardHeader>
          </Card>
        </div>
        
      </div>
      
    </div>
  )
}

export default Profile
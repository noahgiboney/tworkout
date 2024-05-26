import React from "react";
import SideBar from "../components/SideBar";
import styles from "./profile.module.css";
import { Card, CardBody, CardHeader, Text, Avatar } from "@chakra-ui/react";

const Profile = () => {
  return (
    <div className={styles.main}>
      <div>
        <SideBar />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>My Profile</div>
        <div className={styles.avatar}>
          <Avatar size="2xl" />
        </div>
        <div className={styles.cards}>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader paddingBottom="0rem">
              <Text fontSize={24} color="black">
                Email
              </Text>
            </CardHeader>
            <CardBody>
              <Card paddingTop="0rem" bgColor="#C7B3DC">
                <CardHeader>
                  <Text fontSize={18} color="black">
                    johndoe@gmail.com
                  </Text>
                </CardHeader>
              </Card>
            </CardBody>
          </Card>
          <Card marginTop="1rem" marginBottom="1rem" bgColor="#E9E4F2">
            <CardHeader paddingBottom="0rem">
              <Text fontSize={24} color="black">
                Profile
              </Text>
            </CardHeader>
            <CardBody>
              <div className={styles.nameCards}>
                <div className={styles.firstName}>
                  <Text fontSize={18} color="black">
                    First Name
                  </Text>
                  <Card paddingTop="0rem" bgColor="#C7B3DC">
                    <CardHeader>John</CardHeader>
                  </Card>
                </div>
                <div className={styles.lastName}>
                  <Text fontSize={18} color="black">
                    Last Name
                  </Text>
                  <Card paddingTop="0rem" bgColor="#C7B3DC">
                    <CardHeader>Doe</CardHeader>
                  </Card>
                </div>
              </div>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Weight
              </Text>
              <Card bgColor="#C7B3DC">
                <CardHeader>500 lbs</CardHeader>
              </Card>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Height
              </Text>
              <Card bgColor="#C7B3DC">
                <CardHeader>6&apos;0&quot;</CardHeader>
              </Card>
              <Text paddingTop="1rem" fontSize={18} color="black">
                Age
              </Text>
              <Card bgColor="#C7B3DC">
                <CardHeader>45</CardHeader>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

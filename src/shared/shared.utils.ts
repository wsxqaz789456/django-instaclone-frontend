import * as AWS from "aws-sdk";

declare var process: {
  env: {
    REACT_APP_AWS_KEY: string;
    REACT_APP_AWS_SECRET: string;
  };
};
AWS.config.update({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  },
});

export const uploadPhoto = async (profilePhoto: any, data: any) => {
  const { username } = await data;
  const objectName = `${username}-${Date.now()}-${profilePhoto.name}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-project-instaclone",
      Key: objectName,
      ACL: "public-read",
      Body: profilePhoto,
    })
    .promise();
  return Location;
};

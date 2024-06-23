export const SampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ankur Gour",
    _id: "1",
    groupChat: "false",
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shanu",
    _id: "2",
    groupChat: "true",
    members: ["1", "2"],
  },
  
];


export const sampleUsers=[
  {
  
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ananya",
    _id: "1",},
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shanu",
    _id: "2",
  },
  
];
export const sampleNotifications=[
  {
    sender:{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ananya",},
    _id: "1",
  },
  {
    sender:{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shanu",},
    _id: "2",
  },
]

export const sampleMessage=[
  {
    attachments:[
      {
        public_id:"asdasd",
        url:"https://www.w3schools.com/howto/img_avatar.png",
      }
    ],
    content:"ankur ka message h",
    _id:"adsfvgfbfds",
    sender:{
      _id:"user._id",
      name:"Chaman",
    },
    chat:"ChatId",
    createdAt:"2024-02-20T10:41:30.630Z",
  },
  {
    attachments:[
      {
        public_id:"addsdasd",
        url:"https://www.w3schools.com/howto/img_avatar.png",
      }
    ],
    content:"ankur ka message double s h",
    _id:"adsfvgfbfdswqderf",
    sender:{
      _id:"sadfbgfg",
      name:"Chaman2",
    },
    chat:"ChatId",
    createdAt:"2024-02-20T10:41:30.630Z",
  },
]


export const DashboardData={
  users:[
    {
      name:"Ankur gour",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id:"1",
    username:"ankur_07",
    friends:"5",
    groups:"4",
    },
    {name:"Shanu",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id:'2',
    username:"shanu_09",
    friends:"12",
    groups:"8",

    }
  
],
chats:[{
  name:"Ankur Tambah",
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  _id:"1",
  groupChat: "false",
  members:[{_id:"1",avatar:["https://www.w3schools.com/howto/img_avatar.png"]},{_id:"2",avatar:["https://www.w3schools.com/howto/img_avatar.png"]}],
  totalMembers:2,
  totalMessages:30,
  creator:{
     name:"shanu",
     avatar: "https://www.w3schools.com/howto/img_avatar.png",
  }
},
{
  name:"Ankur Tambahddd",
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  _id:"2",
  groupChat: "false",
  members:[{_id:"1",avatar:["https://www.w3schools.com/howto/img_avatar.png"]},{_id:"2",avatar:["https://www.w3schools.com/howto/img_avatar.png"]}],

  totalMembers:2,
  totalMessages:30,
  creator:{
     name:"shanu",
     avatar: "https://www.w3schools.com/howto/img_avatar.png",
  }
}
],
messages:[
  
    {
      attachments:[],
      content:"ankur ka message h",
      _id:"adsfvgfbfdsfdvd",
      sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name:"Chaman",
      },
      chat:"ChatId",
      groupChat:"false",
      createdAt:"2024-02-20T10:41:30.630Z",
    },
    {
      attachments:[
        {
          public_id:"asdasd",
          url:"https://www.w3schools.com/howto/img_avatar.png",
        }
      ],
      content:"ankur wali ka message h",
      _id:"adsfvgfbfds",
      sender:{
       avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name:"Chaman",
      },
      chat:"ChatId",
      groupChat:"true",

      createdAt:"2024-02-20T10:41:30.630Z",
    },
  

]

};



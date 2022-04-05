const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: 'WallacloneAdmin',
      email: 'admin@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar:
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647973795/kangaroo/user_profiles/kangaroo_nqpecd.webp',
      phone: '650476450',
      location: 'Madrid',
      personalDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac purus non augue rhoncus accumsan in eget neque. Sed convallis nisi ullamcorper quam viverra ornare.',
      active: true,
      userToken: '',
      followers: [],
      followings: [],
      conversations: [],
      favorites: []
    },
    {
      name: 'WallacloneAdvertiser',
      email: 'advertiser@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar:
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1648727523/kangaroo/user_profiles/image_r9cjix.jpg',
      phone: '660566420',
      location: 'Sevilla',
      personalDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac purus non augue rhoncus accumsan in eget neque. Sed convallis nisi ullamcorper quam viverra ornare.',
      active: true,
      userToken: '',
      followers: [],
      followings: [],
      conversations: [],
      favorites: []
    },
    {
      name: 'WallacloneUser',
      email: 'user@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar:
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1648727501/kangaroo/user_profiles/image_ttkps9.jpg',
      phone: '670894312',
      location: 'Valencia',
      personalDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac purus non augue rhoncus accumsan in eget neque. Sed convallis nisi ullamcorper quam viverra ornare.',
      active: true,
      userToken: '',
      followers: [],
      followings: [],
      conversations: [],
      favorites: []
    },
    {
      name: 'WallacloneUser2',
      email: 'kangaroomailer@gmail.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar:
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1648727535/kangaroo/user_profiles/image_bcyrzz.jpg',
      phone: '650476451',
      location: 'Barcelona',
      personalDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac purus non augue rhoncus accumsan in eget neque. Sed convallis nisi ullamcorper quam viverra ornare.',
      active: true,
      userToken: '',
      followers: [],
      followings: [],
      conversations: [],
      favorites: []
    }
  ]
};
module.exports = data;

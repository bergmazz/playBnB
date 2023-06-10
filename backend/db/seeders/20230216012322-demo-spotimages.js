"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          preview: true,
          url: "https://images.unsplash.com/photo-1517383037120-c93dcf1a4973?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHN0cmluZyUyMGxpZ2h0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
        },
        {
          spotId: 2,
          preview: true,
          url: "https://media.istockphoto.com/id/478291754/photo/pirate-ship-in-adventure-playground.jpg?b=1&s=612x612&w=0&k=20&c=QatRpynZuJ0z0MoWfnCE9g54y4AKCbfbzOxh1uSUJfs=",
        },
        {
          spotId: 2,
          preview: false,
          url: "https://images.pexels.com/photos/10949649/pexels-photo-10949649.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 3,
          preview: true,
          url: "https://media.istockphoto.com/id/641269044/photo/jungle-kids-room-with-hammock.jpg?b=1&s=612x612&w=0&k=20&c=owW88WZQUa7i_FDxfu0gDKiQzW6KvYsSrBJ32f3qTQY=",
        },
        {
          spotId: 2,
          preview: false,
          url: "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 1,
          preview: false,
          url: "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          spotId: 1,
          preview: false,
          url: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 1,
          preview: false,
          url: "https://images.pexels.com/photos/2640604/pexels-photo-2640604.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 1,
          preview: false,
          url: "https://images.pexels.com/photos/13986983/pexels-photo-13986983.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 2,
          preview: false,
          url: "https://images.unsplash.com/photo-1631528858266-5ebeb8bfc6f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJlYWNoJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 2,
          preview: false,
          url: "https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 3,
          preview: false,
          url: "https://img.freepik.com/free-photo/interior-kids-room-decoration-with-toys_23-2149096016.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 3,
          preview: false,
          url: "https://img.freepik.com/premium-photo/creative-cozy-scandi-child-room-interior-design-with-toys-other-accessories-template_431307-4394.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 3,
          preview: false,
          url: "https://media.istockphoto.com/id/474648228/photo/on-safari.jpg?b=1&s=612x612&w=0&k=20&c=Q4GAh7GI49f-xsv_KQYugG6EFf0nzaucRy50PVsUpAc=",
        },
        {
          spotId: 3,
          preview: false,
          url: "https://media.istockphoto.com/id/641269142/photo/kids-room-with-play-tent.jpg?b=1&s=612x612&w=0&k=20&c=p7gdyFCG3C62UsyOrkYmXBjOahCtX59irYdl_zRlPrg=",
        },
        {
          spotId: 4,
          preview: true,
          url: "https://img.freepik.com/premium-photo/luxurious-expensive-interior-design-room-old-baroque-style-beige-colors_267786-820.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 4,
          preview: false,
          url: "https://media.istockphoto.com/id/1059655678/photo/girl-acting-as-princess-in-castle.jpg?b=1&s=612x612&w=0&k=20&c=KTtEEb3WNy7vZAzZjqtyR3ZSicGnKQYrB_sTLUIrS7E=",
        },
        {
          spotId: 4,
          preview: false,
          url: "https://images.unsplash.com/photo-1506003814204-7eba0a3a6600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJpbmNlc3MlMjB0b3lzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 4,
          preview: false,
          url: "https://img.freepik.com/premium-photo/interior-luxury-bedroom-light-colors_537415-618.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 4,
          preview: false,
          url: "https://img.freepik.com/premium-photo/boudoir-table-details-interior-bedroom-girls-make-up-hairstyles-with-mirror_85672-574.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 5,
          preview: true,
          url: "https://img.freepik.com/free-photo/play-dough-background-with-sea-animals_23-2149700367.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 6,
          preview: true,
          //    url: "https://images.pexels.com/photos/11190692/pexels-photo-11190692.jpeg?auto=compress&cs=tinysrgb&w=600",
          url: "https://images.unsplash.com/photo-1603621760091-d7b12c66549a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHNwYWNlc2hpcCUyMHRveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
        },
        {
          spotId: 7,
          preview: true,
          url: "https://media.istockphoto.com/id/1168766129/photo/toy-childrens-horse-for-a-child-horse-in-a-cap.jpg?b=1&s=612x612&w=0&k=20&c=YPhMtsgBf7aKGkaw6zX04mmb2j3TVPfxurPgZyxkj80=",
        },
        {
          spotId: 8,
          preview: true,
          url: "https://images.pexels.com/photos/2002338/pexels-photo-2002338.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 9,
          preview: true,
          url: "https://img.freepik.com/free-photo/close-up-spooky-halloween-toys-with-confetti_23-2148609849.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 10,
          preview: true,
          url: "https://images.unsplash.com/photo-1604601638406-edc29b54dcf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
        },
        {
          spotId: 11,
          preview: true,
          url: "https://images.unsplash.com/photo-1596716148130-f95f2b735a92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGtuaWdodHMlMjBhcm1vdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 12,
          preview: true,
          url: "https://images.unsplash.com/photo-1629551609641-462683917a13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBpcmF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
        },
        {
          spotId: 13,
          preview: true,
          url: "https://images.pexels.com/photos/7055873/pexels-photo-7055873.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 14,
          preview: true,
          url: "https://images.unsplash.com/photo-1631901999319-efd71a712378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGdsYXNzJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
        },
        {
          spotId: 15,
          preview: true,
          url: "https://media.istockphoto.com/id/1258724062/photo/interior-of-a-modern-kindergarten-classroom.jpg?b=1&s=612x612&w=0&k=20&c=n2ac8kS83jX2xrkga3jb4vyRseoybOS8FDzinXmnpxw=",
        },
        {
          spotId: 16,
          preview: true,
          url: "https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRpa2klMjBodXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 17,
          preview: true,
          url: "https://images.unsplash.com/photo-1625686081220-a15407e872b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdpemFyZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
          spotId: 18,
          preview: true,
          url: "https://img.freepik.com/premium-photo/colorful-kids-toys-carpet_392895-187923.jpg?size=626&ext=jpg&ga=GA1.1.2082271488.1680582282&semt=ais",
        },
        {
          spotId: 19,
          preview: true,
          url: "https://images.pexels.com/photos/9044079/pexels-photo-9044079.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          spotId: 20,
          preview: true,
          url: "https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, null, {});
  },
};

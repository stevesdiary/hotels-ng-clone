const { v4: uuidv4 } = require("uuid");
const {
  Hotel,
  Room,
  Facility,
  RatingAndReview,
  Reservation,
  Sequelize,
} = require("../models");
// const { logging } = require("googleapis/build/src/apis/logging");
const Op = Sequelize.Op;

const hotelController = {
  createHotel: async (req, res) => {
    try {
      const id = uuidv4();
      const {
        name,
        address,
        city,
        state,
        description,
        hotelType,
        numberOfRooms,
        contactEmail,
        contactPhone,
        termsAndConditions,
      } = req.body;
      const createHotel = await Hotel.create({
        id,
        name,
        address,
        city,
        state,
        description,
        hotelType,
        numberOfRooms,
        contactEmail,
        contactPhone,
        termsAndConditions,
      });
      return res
        .status(201)
        .send({ message: "Record created.", data: createHotel });
    } catch (err) {
      return res.status(500).send({ message: "An error occoured", err });
    }
  },

  findAllHotel: async (req, res) => {
    try {
      // const capitalizeEveryFirstWord = (str) => {
      // return str.charAt(0).toUpperCase() + str.slice(1);
      // return str.replace(/\b\w/g, (char) => char.toUpperCase());
      // }
      const hotelType = req.query.hotelType;
      const search = req.query.search;
      const {
        restaurant,
        barLaunge,
        gym,
        roomService,
        wifiInternet,
        dstv,
        security,
        swimmingPool,
        cctv,
        frontDesk24h,
        carHire,
        electricity24h
      } = req.query;
      
      const facilities = {
        restaurant,
        barLaunge,
        gym,
        roomService,
        wifiInternet,
        dstv,
        security,
        swimmingPool,
        cctv,
        frontDesk24h,
        carHire,
        electricity24h
      };
      
      const minPrice = req.query.minPrice || 0;
      const maxPrice = req.query.maxPrice;
      let nameCitySearch = [];
      if (search) {
        nameCitySearch.push({
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { city: { [Op.like]: `%${search}%` } },
            { state: { [Op.like]: `%${search}%` } },
          ],
        });
      }
      const whereConditions = {
        [Op.and]: [...nameCitySearch],
      };
      if (minPrice !== undefined && maxPrice !== undefined) {
        whereConditions["$rooms.price$"] = {
          [Op.between]: [minPrice, maxPrice],
        };
      }

      //SEparate this endpoint to filter by 
      // if (dateIn !== undefined && dateOut !== undefined) {
      //   whereConditions["$reservation.date_in$"] = {
          
      //     [Op.between]: [dateIn, dateOut],
          
      //   };
      // }
      if (hotelType !== undefined) {
        whereConditions["$hotel.hotelType$"] = {
          [Op.like]: [hotelType],
        };
      }
      if (facilities !== undefined) {
        const facilityConditions = [
          "restaurant",
          "barLaunge",
          "gym",
          "roomService",
          "wifiInternet",
          "dstv",
          "security",
          "swimmingPool",
          "cctv",
          "frontDesk24h",
          "carHire",
          "electricity24h",
        ];
      
        const facilityValues = [
          restaurant,
          barLaunge,
          gym,
          roomService,
          wifiInternet,
          dstv,
          security,
          swimmingPool,
          cctv,
          frontDesk24h,
          carHire,
          electricity24h,
        ];
        facilityConditions.forEach((condition, index) => {
          if (facilityValues[index]) {
            whereConditions[`$facilities.${condition}$`] = {
              [Op.eq]: facilityValues[index],
            };
          }
        });
        // facilityConditions.forEach((condition, index) => {
        //   whereConditions[`$facilities.${condition}$`] = {
        //     [Op.eq]: facilityValues[index],
        //   };
        // });
      }
      
      const { count, rows: hotels } = await Hotel.findAndCountAll({
        // logging: console.log,
        distinct: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        where: whereConditions,
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: {
              exclude: [
                "id",
                "hotelId",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
          {
            model: Facility,
            as: "facilities",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: RatingAndReview,
            as: "ratingAndReview",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: Reservation,
            as: "reservation",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      // if (count == 0) {
      //   return res.status(404).send({
      //     Message:
      //       "No record found for this search, try checking the search parameters, you can search by the Hotel name, price range, city, hotel facilities.",
      //   });
      // }
      return res
        .status(200)
        .send({ Message: `Hotel records found.`, Count: count, Hotel: hotels });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ Message: "An error occoured", Error: err });
    }
  },
  topDeals: async (req, res) => {
    try{
      const state = req.query.state;
      const whereConditions = {};
      if (state !== undefined) {
        whereConditions["$hotels.state$"] = {
          [Op.eq]: [state],
        };
      }
      const { count, rows: hotels } = await Hotel.findAndCountAll({
        // logging: console.log,
        distinct: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
          include: [
              [
                  Sequelize.literal('(SELECT COUNT(*) FROM `Rooms` WHERE `Rooms`.`deals` = `Room`.`deals`)'),
                  'dealsCount',
              ],
          ],
        },
        where: whereConditions,
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: {
              exclude: [
                "id",
                "hotelId",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
          {
            model: Facility,
            as: "facilities",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: RatingAndReview,
            as: "ratingAndReview",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: Reservation,
            as: "reservation",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
        group: ['Hotel.id'],
        order: [[Sequelize.literal('dealsCount'), 'DESC']],
        limit: 6,
      });

      return res
        .status(200)
        .send({ Message: `Hotel records found.`, Count: count, Hotel: hotels });
    }
    catch (err) {
      console.error(err);
      return res.status(500).send({ Message: "An error occoured", Error: err });
    }
  },
  findHotelByDate: async (req, res) => {
    try{
      const dateIn = req.query.dateIn;
      const dateOut = req.query.dateOut;
      const whereConditions = {};
      if (dateIn !== undefined && dateOut !== undefined) {
        whereConditions["$reservation.dateIn$"] = {
          
          [Op.between]: [dateIn, dateOut],
          
        };
      }
      const { count, rows: hotels } = await Hotel.findAndCountAll({
        // logging: console.log,
        distinct: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        where: whereConditions,
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: {
              exclude: [
                "id",
                "hotelId",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
          {
            model: Facility,
            as: "facilities",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: RatingAndReview,
            as: "ratingAndReview",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: Reservation,
            as: "reservation",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      if (count == 0) {
        return res.status(404).send({
          Message:
            "No record found for this date range.",
        });
      }
      return res
        .status(200)
        .send({ Message: `Hotel records found.`, Count: count, Hotel: hotels });
    }
    catch(err){
      console.error(err);
      return res.status(500).send({ Message: "An error occoured", Error: err });
    }
  },
  topHotelsByState: async (req, res) => {
    try{
      const state = req.query.state;
      const whereConditions = {};
      if (state !== undefined) {
        whereConditions["$hotels.state$"] = {
          [Op.eq]: [state],
        };
      }
      const { count, rows: hotels } = await Hotel.findAndCountAll({
        // logging: console.log,
        distinct: true,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
          include: [Sequelize.literal('(SELECT COUNT(*) FROM "Reservations" WHERE "Reservations"."hotelId" = "Hotel"."id")'),
            'reservationCount',
          ],
        },
        where: whereConditions,
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: {
              exclude: [
                "id",
                "hotelId",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
          {
            model: Facility,
            as: "facilities",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: RatingAndReview,
            as: "ratingAndReview",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: Reservation,
            as: "reservation",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
              include: [[Sequelize.fn('COUNT',Sequelize.col('reservation.id')), 'reservationCount']],
            },
          },
        ],
        group: ['Hotel.id'],
        order: [[Sequelize.literal('reservationCount'), 'DESC']],
        limit: 6,
      });

      return res
        .status(200)
        .send({ Message: `Hotel records found.`, Count: count, Hotel: hotels });
    }
    catch(err){
      return res.status(500).send({ Message: "An error occoured", Error: err });
    }
  },

  findOneHotel: async (req, res) => {
    try {
      const id = req.params.id;
      const hotel = await Hotel.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: {
              exclude: [
                "id",
                "hotelId",
                "createdAt",
                "updatedAt",
                "deletedAt",
              ],
            },
          },
          {
            model: Facility,
            as: "facilities",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: RatingAndReview,
            as: "ratingAndReview",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            model: Reservation,
            as: "reservation",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      if (hotel) {
        return res
          .status(200)
          .send({ Message: "Hotel record found.", Hotel: hotel });
      } else {
        return res.status(404).send({ Message: "Hotel not found." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "An error occurred", err });
    }
  },

  updateHotel: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        address,
        city,
        state,
        description,
        hotelType,
        numberOfRooms,
        contactEmail,
        contactPhone,
        termsAndConditions,
      } = req.body;
      const updateHotel = await Hotel.update(
        {
          name,
          address,
          city,
          state,
          description,
          hotelType,
          numberOfRooms,
          contactEmail,
          contactPhone,
          termsAndConditions,
        },
        { where: { id } }
      );
      console.log("Record updated", updateHotel);
      if (updateUser == 1) {
        return res
          .status(200)
          .send({ Message: "Record updated.", Hotel: updateHotel });
      } else {
        console.error(`Record not updated, there's an error`)
      }
    } catch (err) {
      return res.status(500).send({ Message: "An error occoured", err });
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const id = req.params.id;
      const hotel = await Hotel.destroy({ where: { id } });
      if (hotel == 1) {
        return res.send({
          message: `User with id ${id} has been deleted successfully!`,
        });
      }
      if (hotel == 0) {
        return res.send({
          message: `User ${id} does not exist or is deleted in the database`,
        });
      }
    } catch (err) {
      return res.status(500).send({ message: "An error occoured", err });
    }
  },
};

module.exports = hotelController;

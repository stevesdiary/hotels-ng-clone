const { v4: uuidv4 } = require("uuid");
const {
  Hotel,
  Room,
  Facility,
  RatingAndReview,
  Reservation,
  Sequelize,
} = require("../models");
const { logging } = require("googleapis/build/src/apis/logging");
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
      // console.log('Record created', createHotel);
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
      const hotel_type = req.query.hotelType;
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
      const dateIn = req.query.dateIn;
      const dateOut = req.query.dateOut;
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
      // if (date_in !== undefined && date_out !== undefined) {
      //   whereConditions["$reservation.date_in$"] = {
      //     [Op.notBetween]: [date_in, date_out],
      //   };
      //   whereConditions["$reservation.date_out$"] = {
      //     [Op.notBetween]: [date_in, date_out],
      //   };
      // }

      //SEparate this endpoint to filter by 
      if (dateIn !== undefined && dateOut !== undefined) {
        whereConditions["$reservation.date_in$"] = {
          
          [Op.between]: [dateIn, dateOut],
          
        };
      }
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
          whereConditions[`$facilities.${condition}$`] = {
            [Op.eq]: facilityValues[index],
          };
        });
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
            "No record found for this search, try checking the search parameters n\
            You can search by Hotel name, price range, city, hotel facilities and date range.",
        });
      }
      return res
        .status(200)
        .send({ Message: `Hotel records found.`, Count: count, Hotel: hotels });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ Message: "An error occoured", Error: err });
    }
  },
  findHotelByDate: async (req, res) => {
    try{

    }
    catch(err){
      console.error(err);
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
      const updateUser = await Hotel.update(
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
      console.log("Record updated", createHotel);
      if (updateUser == 1) {
        return res
          .status(200)
          .send({ Message: "Record updated.", Hotel: createHotel });
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

const School = require('../models/schoolModel');
const Address = require('../models/addressModel');
const Organization = require('../models/organizationModel');
exports.createSchool = async (req, res) =>
{
     try
     {
          const { name, status, startTime, endTime, shift, address, hasProjector, hasLaptop, organization } = req.body;

          // Save Address
          const savedAddress = await Address.create(address);

          // Save Organization
          const savedOrganization = await Organization.create(organization);

          // Save School
          const savedSchool = await School.create({
               name,
               status,
               startTime,
               endTime,
               shift,
               address: savedAddress,
               hasProjector,
               hasLaptop,
               organization: savedOrganization,
          });

          // Update School with address ID and organization ID
          savedSchool.address = savedAddress._id;
          savedSchool.organization = savedOrganization._id;
          await savedSchool.save();

          res.json(savedSchool);
     } catch (error)
     {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

// PUT endpoint for updating
exports.updateSchool = async (req, res) =>
{
     try
     {
          const { name, status, startTime, endTime, shift, address, hasProjector, hasLaptop, organization } = req.body;
          const schoolId = req.params.id;

          // Find the school by ID
          const existingSchool = await School.findById(schoolId);

          if (!existingSchool)
          {
               return res.status(404).json({ error: 'School not found' });
          }

          // Update the school fields
          existingSchool.name = name;
          existingSchool.status = status;
          existingSchool.startTime = startTime;
          existingSchool.endTime = endTime;
          existingSchool.shift = shift;
          existingSchool.hasProjector = hasProjector;
          existingSchool.hasLaptop = hasLaptop;

          // Update the address and organization
          existingSchool.address = { ...existingSchool.address, ...address };
          existingSchool.organization = { ...existingSchool.organization, ...organization };

          // Save the updated school
          const updatedSchool = await existingSchool.save();

          res.json(updatedSchool);
     } catch (error)
     {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

// GET endpoint by ID
exports.getSchoolById = async (req, res) =>
{
     try
     {
          const school = await School.findById(req.params.id).populate('address organization').exec();

          if (!school)
          {
               return res.status(404).json({ error: 'School not found' });
          }

          res.json(school);
     } catch (error)
     {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

// GET endpoint for all schools
exports.getAllSchools = async (req, res) =>
{
     try
     {
          const schools = await School.find().populate('address organization').exec();
          res.json(schools);
     } catch (error)
     {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

// DELETE endpoint
exports.deleteSchool = async (req, res) =>
{
     try
     {
          const result = await School.findByIdAndDelete(req.params.id);

          if (!result)
          {
               return res.status(404).json({ error: 'School not found' });
          }

          res.json({ success: true });
     } catch (error)
     {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

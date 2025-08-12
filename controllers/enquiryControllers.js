import enquiryCollection from "../models/enquiryCollection.js";
import nodemailer from 'nodemailer';


const getDetails = async (req, res) => {
    try {
        const { name, mobile, purpose, services } = req.body;

        if (!name || !mobile || !purpose || !services) {
            return res.status(400).json({ msg: "Please fill all details" });
        }

        
        const newEnquiry = new enquiryCollection({
            name,
            mobile,
            purpose,
            services
        });

    
        await newEnquiry.save();

        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllDetails = async (req,res) =>{
     try {
    const enquiries = await enquiryCollection.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch enquiries', error });
  }
}

const getOnMail = async (req,res)=>{
 try {
    const enquiries = await enquiryCollection.find();


    // Format enquiries into HTML table
    const tableRows = enquiries.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.mobile}</td>
        <td>${item.purpose}</td>
        <td>${item.services?.join(', ')}</td>
      </tr>
    `).join('');

    const emailBody = `
      <h2>All Enquiries</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Purpose</th>
          <th>Services</th>
        </tr>
        ${tableRows}
      </table>
    `;

    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD, // Use app password from Google
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // You can hardcode or allow input
      subject: 'All Enquiries from Admin Panel',
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ msg: 'Failed to send email' });
  }
}

export {
    getDetails,
    getAllDetails,
    getOnMail
};

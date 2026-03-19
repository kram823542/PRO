const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    console.log('📝 New contact form submission:', { name, phone });

    // Validation
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, phone and message'
      });
    }

    // Get IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create contact entry
    const contact = await Contact.create({
      name,
      phone,
      message,
      ipAddress,
      userAgent
    });

    console.log('✅ Contact saved to database:', contact._id);

    // Optional: Send email notification to admin
    // await sendEmailNotification(contact);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        _id: contact._id,
        name: contact.name,
        phone: contact.phone,
        message: contact.message,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Contact submission error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort order
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    // Execute query
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// @desc    Get single contact by ID (Admin only)
// @route   GET /api/contact/:id
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Mark as read if it was unread
    if (contact.status === 'unread') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid status (read or replied)'
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.status = status;
    await contact.save();

    res.json({
      success: true,
      message: `Contact marked as ${status}`,
      data: contact
    });

  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
};

// @desc    Delete contact (Admin only)
// @route   DELETE /api/contact/:id
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/stats
const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ status: 'unread' });
    const read = await Contact.countDocuments({ status: 'read' });
    const replied = await Contact.countDocuments({ status: 'replied' });

    // Get last 7 days submissions
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const recentCount = await Contact.countDocuments({
      createdAt: { $gte: last7Days }
    });

    res.json({
      success: true,
      data: {
        total,
        unread,
        read,
        replied,
        recentCount,
        unreadPercentage: total > 0 ? Math.round((unread / total) * 100) : 0
      }
    });

  } catch (error) {
    console.error('❌ Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
};
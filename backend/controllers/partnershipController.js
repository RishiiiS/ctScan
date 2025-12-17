import Partnership from '../models/Partnership.js';

// @desc    Submit partnership request
// @route   POST /api/partnerships
// @access  Public
export const createPartnership = async (req, res) => {
  try {
    const { companyName, contactName, email, phone, website, partnershipType, message } = req.body;

    const partnership = await Partnership.create({
      companyName,
      contactName,
      email,
      phone,
      website,
      partnershipType,
      message,
      user: req.user ? req.user._id : null
    });

    res.status(201).json({
      success: true,
      data: partnership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all partnerships
// @route   GET /api/partnerships
// @access  Private/Admin
export const getAllPartnerships = async (req, res) => {
  try {
    const partnerships = await Partnership.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: partnerships.length,
      data: partnerships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single partnership
// @route   GET /api/partnerships/:id
// @access  Private
export const getPartnershipById = async (req, res) => {
  try {
    const partnership = await Partnership.findById(req.params.id).populate('user', 'name email');
    
    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    res.json({
      success: true,
      data: partnership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update partnership status
// @route   PUT /api/partnerships/:id
// @access  Private/Admin
export const updatePartnership = async (req, res) => {
  try {
    const partnership = await Partnership.findById(req.params.id);
    
    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    const { status } = req.body;
    
    if (status) partnership.status = status;

    const updatedPartnership = await partnership.save();

    res.json({
      success: true,
      data: updatedPartnership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete partnership
// @route   DELETE /api/partnerships/:id
// @access  Private/Admin
export const deletePartnership = async (req, res) => {
  try {
    const partnership = await Partnership.findById(req.params.id);
    
    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }

    await partnership.deleteOne();

    res.json({
      success: true,
      message: 'Partnership removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

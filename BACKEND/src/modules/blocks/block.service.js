import { Block } from './block.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { createAudit } from '../../middlewares/audit.middleware.js';

export const createBlock = async (req, data) => {
  const exists = await Block.findOne({
    $or: [{ name: data.name }, { code: data.code.toUpperCase() }],
  });
  if (exists) throw ApiError.conflict('Block name or code already exists');

  const block = await Block.create({ ...data, code: data.code.toUpperCase(), createdBy: req.user._id });
  await createAudit({ req, action: 'BLOCK_CREATED', targetType: 'Block', targetId: block._id });
  return block;
};

export const listBlocks = async (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  return Block.find(filter).sort({ name: 1 });
};

export const updateBlock = async (req, id, data) => {
  const block = await Block.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!block) throw ApiError.notFound('Block not found');
  await createAudit({ req, action: 'BLOCK_UPDATED', targetType: 'Block', targetId: id });
  return block;
};
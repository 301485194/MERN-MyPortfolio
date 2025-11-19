import Qualification from '../models/qualifications.js';

export const list = async (req, res, next) => {
  try { res.json(await Qualification.find()); } catch (e) { next(e); }
};
export const read = async (req, res, next) => {
  try {
    const doc = await Qualification.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { const doc = await Qualification.create(req.body); res.status(201).json(doc); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try {
    const doc = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try {
    const doc = await Qualification.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
};
export const removeAll = async (req, res, next) => {
  try { await Qualification.deleteMany({}); res.json({ message: 'All qualifications removed' }); } catch (e) { next(e); }
};

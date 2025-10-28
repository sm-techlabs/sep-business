import { Op } from 'sequelize';

export function parseFilters(query) {
  const filters = {};

  for (const [key, rawValue] of Object.entries(query)) {
    // Split comma-separated values and trim
    const values = rawValue.split(',').map(v => v.trim()).filter(Boolean);

    // Separate includes and excludes
    const includes = values.filter(v => !v.startsWith('!'));
    const excludes = values.filter(v => v.startsWith('!')).map(v => v.slice(1));

    // Build filter condition
    if (includes.length && excludes.length) {
      filters[key] = {
        [Op.and]: [
          { [Op.in]: includes },
          { [Op.notIn]: excludes }
        ]
      };
    } else if (includes.length) {
      filters[key] = { [Op.in]: includes };
    } else if (excludes.length) {
      filters[key] = { [Op.notIn]: excludes };
    }
  }

  return filters;
}

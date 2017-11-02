import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String
  },
  label: {
    type: String
  },
  date: {
    type: String
  },
  text: {
    type: String
  }
}, {
  timestamps: true
})

taskSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      label: this.label,
      date: this.date,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Task', taskSchema)

export const schema = model.schema
export default model

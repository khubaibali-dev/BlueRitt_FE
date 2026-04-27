import api from ".";

export interface SupportTicketData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  attachment?: File;
}

export const createSupportTicket = (data: SupportTicketData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("subject", data.subject);
  formData.append("category", data.category);
  formData.append("message", data.message);
  
  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  return api.post("/common/support/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

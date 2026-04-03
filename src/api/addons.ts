import api from ".";

export interface Addon {
  id: string;
  status: "active" | "inactive";
  status_display: string;
  cost: string;
  type: string;
  description: string;
  type_display: string;
  num_searches: number;
  created_at: string;
  modified_at: string;
}

const getActiveAddons = (): Promise<Addon[]> => {
  return api.get("/common/addons/active/").then((res) => res.data);
};

const postPurchaseAddon = ({ id }: { id: string }) => {
  return api.post(`/common/wallet/purchase_addon/`, {
    addon_id: id,
  }).then((res) => res.data);
};

export { getActiveAddons, postPurchaseAddon };

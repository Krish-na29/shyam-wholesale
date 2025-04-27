import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2, FilterX } from "lucide-react";

type PhoneRecord = {
  id: string;
  phone: string;
  created_at: string;
  status: string;
};

export default function PhoneNumbersTable() {
  const [phones, setPhones] = useState<PhoneRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const fetchPhones = async () => {
    setLoading(true);
    // Type assertion needed until Supabase types are regenerated
    let query = supabase
      .from('customer_phones' as any)
      .select('*')

    // Apply status filter if not 'all'
    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus);
    }

    // Apply sort order
    query = query.order('created_at', { ascending: sortOrder === 'oldest' });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching phone numbers:', error.message);
    } else {
      // Type assertion needed until Supabase types are regenerated
      let filteredData = data as unknown as PhoneRecord[] || [];
      
      // Apply search filter if present
      if (searchQuery) {
        filteredData = filteredData.filter(record => 
          record.phone.includes(searchQuery)
        );
      }
      
      setPhones(filteredData);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPhones(); }, [filterStatus, sortOrder]);
  
  // Apply search filter with debounce
  useEffect(() => {
    const handler = setTimeout(() => fetchPhones(), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleYes = async (id: string) => {
    // Type assertion needed until Supabase types are regenerated
    const { error } = await supabase
      .from('customer_phones' as any)
      .update({ status: 'yes' } as any)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating status:', error.message);
    } else {
      fetchPhones();
    }
  };

  const handleNo = async (id: string) => {
    // Type assertion needed until Supabase types are regenerated
    const { error } = await supabase
      .from('customer_phones' as any)
      .update({ status: 'no' } as any)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating status:', error.message);
    } else {
      fetchPhones();
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this phone number?')) return;
    
    // Type assertion needed until Supabase types are regenerated
    const { error } = await supabase
      .from('customer_phones' as any)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting phone number:', error.message);
    } else {
      fetchPhones();
    }
  };

  return (
    <div className="my-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Customer Mobile Numbers</h2>
          <Button size="sm" variant="outline" onClick={() => fetchPhones()}>
            Refresh List
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Search by Phone</label>
            <Input 
              placeholder="Search phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="yes">Contacted</SelectItem>
                <SelectItem value="no">Not Interested</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sort Order</label>
            <Select value={sortOrder} onValueChange={(val: 'newest' | 'oldest') => setSortOrder(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
                setSortOrder('newest');
              }}
            >
              <FilterX className="h-4 w-4 mr-2" /> Clear Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[350px] w-full border rounded">
          <thead>
            <tr className="bg-devotional-orange text-white">
              <th className="py-2 px-3">Mobile No</th>
              <th className="py-2 px-3">Added</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((rec) => (
              <tr key={rec.id} className="border-t">
                <td className="py-2 px-3 font-mono">{rec.phone}</td>
                <td className="py-2 px-3 text-xs">{new Date(rec.created_at).toLocaleString()}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${rec.status === 'yes' ? 'bg-green-100 text-green-800' : rec.status === 'no' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {rec.status === 'yes' ? 'Contacted' : rec.status === 'no' ? 'Not Interested' : 'Pending'}
                  </span>
                </td>
                <td className="py-2 px-3">
                  {rec.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleYes(rec.id)}>
                        Yes
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleNo(rec.id)}>
                        No
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => handleDelete(rec.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {rec.status === 'yes' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleNo(rec.id)}>
                        Change to No
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => handleDelete(rec.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {rec.status === 'no' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleYes(rec.id)}>
                        Change to Yes
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => handleDelete(rec.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {phones.length === 0 && !loading && (
              <tr><td colSpan={4} className="text-center py-4">No numbers found.</td></tr>
            )}
            {loading && (
              <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

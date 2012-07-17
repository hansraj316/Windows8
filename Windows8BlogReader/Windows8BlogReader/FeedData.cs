using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Web.Syndication;  

namespace Windows8BlogReader
{
    public class FeedData
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PubDate { get; set; }
        private List<FeedItem> _Items = new List<FeedItem>();
        public List<FeedItem> Items
        {
            get
            {
                return this._Items;
            }
        }
    }

    
 }



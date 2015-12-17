__author__ = 'user'

from xml.etree import ElementTree
import urllib
from urllib.parse import quote

def getSheets(start_index, bulk_size, search_str):
#    thumbnails = []
#    ids = []
    sheets = []

    index = str(start_index)
    bulk = str(bulk_size)
    searches = "&query=any,contains,%22%D7%9B%D7%A8%D7%96%D7%95%D7%AA%22"

    if search_str != "":
        search_str = quote(search_str, safe='')
        print(search_str)
        searches = searches + "&query=any,contains,\"" + search_str + "\""

    url = 'http://primo.nli.org.il/PrimoWebServices/xservice/search/brief?institution=NNL_Ephemera{}&indx={}&bulkSize={}'.format(searches, index, bulk)
    print (url)
    u = urllib.request.urlopen(url)
    tree = ElementTree.parse(u).getroot()

    for elem in tree.iter():
        if(elem.tag == "{http://www.exlibrisgroup.com/xsd/jaguar/search}DOC"):
            sheet = {}
            doc = elem
            # doc_id = doc.attrib.get('ID')
            subject = ""
            # rights = ""
            # print ("ID = " + doc_id)
#            ids.append(doc_id)
#             sheet.update({"recordid" : doc_id})
            for e in doc.iter():
                # print (e.tag)

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}recordid"):
                    sheet.update({"recordid" : e.text})

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}lds41"):
#                    thumbnails.append(e.text)
                    sheet.update( {"thumbnail_id" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}lds42"):
                    sheet.update( {"link_id" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}rights"):
                    # rights = e.text[e.text.rfind('=')+1:]
                    sheet.update( {"rights" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}search"):
                    search = e
                    for s in search.iter():
                        if(s.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}title"):
                            sheet.update( {"title" : s.text })

                        if(s.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}subject"):
                            # subject = sheet.get("subject", "")
                            subject = subject + s.text + ','

                    sheet.update( { "subjects" : subject })
                    sheet.update( { "regions" : ""})

            # if sheet.get("rights") == "This item can be accessed by the general public from within and outside the library":
            if sheet.get("rights") == "הצפייה בפריט זה חופשית לכלל המשתמשים, בספרייה ומחוצה לה":
                sheets.append(sheet)
                print("Adding Sheet:" + sheet.get("recordid"))
            else:
                print("Sheet not added due to access rights")
                print(sheet.get("rights"))


    return sheets
#    return thumbnails

def getSheetByRecId(recordId):

    sheet = {}

    url = 'http://primo.nli.org.il/PrimoWebServices/xservice/search/brief?institution=NNL_Ephemera&query=rid,exact,{}&indx=1&bulkSize=1'.format(recordId)
    print (url)
    u = urllib.request.urlopen(url)
    tree = ElementTree.parse(u).getroot()

    for elem in tree.iter():
        if(elem.tag == "{http://www.exlibrisgroup.com/xsd/jaguar/search}DOC"):
            doc = elem
            subject = ""

            for e in doc.iter():
                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}recordid"):
                    sheet.update({"recordid" : e.text})

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}lds41"):
                    sheet.update( {"thumbnail_id" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}lds42"):
                    sheet.update( {"link_id" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}rights"):
                    sheet.update( {"rights" : e.text[e.text.rfind('=')+1:] })

                if(e.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}search"):
                    search = e
                    for s in search.iter():
                        if(s.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}title"):
                            sheet.update( {"title" : s.text })

                        if(s.tag == "{http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib}subject"):
                            subject = subject + s.text + ','

                    sheet.update( { "subjects" : subject })
                    sheet.update( { "regions" : ""})
    return sheet

# getSheetByRecId("NNL_Ephemera01002926506")

# getSheets(1, 10)

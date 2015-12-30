def get_sheets(start_index, bulk_size, search_str):
    sheets = [
        {
            'recordid': '123',
            'thumbnail_id': '456',
            'thumbnail_url': 'http://placekitten.com/240/320',
            'image_url': 'http://placekitten.com/600/800',
            'link_id': '789',
            'rights': 'ok',
            'title': 'hello',
            'subjects': 'xxx,yyy',
        },
    ]
    return sheets


def get_sheet_by_id(recordId):
    return {
        'recordid': '123',
        'thumbnail_id': '456',
        'thumbnail_url': 'http://placekitten.com/240/320',
        'image_url': 'http://placekitten.com/600/800',
        'link_id': '789',
        'rights': 'ok',
        'title': 'hello',
        'subjects': 'xxx,yyy',
    }
